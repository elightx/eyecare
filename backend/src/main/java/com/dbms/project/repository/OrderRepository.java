package com.dbms.project.repository;

import com.dbms.project.models.Discount;
import com.dbms.project.models.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@Repository
@Configuration
@RequiredArgsConstructor
public class OrderRepository {

    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;


    public String generateOrderId(String discountId, String userId) throws IOException {
        String sql =
                "SELECT sum(money) FROM (\n" +
                "    SELECT (cart.quantity * products.price) as money FROM cart \n" +
                "    LEFT JOIN products ON cart.product_id=products.id\n" +
                "    LEFT JOIN lens ON cart.lens_id=lens.id \n" +
                "    WHERE cart.lens_id IS NULL AND cart.user_id= ? \n" +
                "    UNION ALL\n" +
                "    SELECT (cart.quantity * (products.price + lens.price)) as money FROM cart\n" +
                "    LEFT JOIN products ON cart.product_id=products.id \n" +
                "    LEFT JOIN lens ON cart.lens_id=lens.id \n" +
                "    WHERE cart.lens_id IS NOT NULL AND cart.user_id= ? \n" +
                ") u";

        int amount = jdbcTemplate.query(sql, (rs, row) -> {
            return rs.getInt(1);
        }, userId, userId).get(0);
        if (discountId != null) {
            sql = "SELECT * FROM coupon WHERE id = ?";
            List<Discount> discount = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Discount.class), discountId);
            if (!discount.isEmpty()) {
                amount = amount - Math.min(discount.get(0).getPercentage() * amount / 100, discount.get(0).getMaxLimit());
            } else {
                discountId = null;
            }
        }

        amount *= 100;

        URL url = new URL("https://api.razorpay.com/v1/orders");
//        URL url = new URL("https://en4x8zuhd7esg.x.pipedream.net/");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "Basic cnpwX3Rlc3RfR0NEa2JMSzMxV3pZWE46YXVPQnBmbmFGcjdFazJRQlF0WmJ1YWVw");
        con.setDoOutput(true);
        String jsonInputString = "{\"amount\":" + amount + ",\"currency\":\"INR\"}";
        con.getOutputStream().write(jsonInputString.getBytes());
        InputStream is = con.getInputStream();
        BufferedReader rd = new BufferedReader(new InputStreamReader(is));
        StringBuilder response = new StringBuilder(); // or StringBuffer if Java version 5+
        String line;
        while ((line = rd.readLine()) != null) {
            response.append(line);
            response.append('\r');
        }
        rd.close();
        String razorpay_order_id = response.substring(7, 27);

        String address = jdbcTemplate.queryForObject("SELECT address FROM users WHERE id = ?", String.class, userId);

        sql = "INSERT INTO orders (user_id, amount, razorpay_order_id, address, coupon_id) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, userId, amount, razorpay_order_id, address, discountId);

        String orderId = jdbcTemplate.queryForObject("SELECT id FROM orders WHERE razorpay_order_id = ?", String.class, razorpay_order_id);

        sql = "INSERT INTO orderDetails (order_id, product_id, lens_id, quantity) SELECT ?, product_id, lens_id, quantity FROM cart WHERE user_id = ?";
        jdbcTemplate.update(sql, orderId, userId);
        return razorpay_order_id;
    }

    public void updatePayment(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature, String userId) {
        String sql = "UPDATE orders SET razorpay_payment_id = ?, razorpay_signature = ? WHERE razorpay_order_id = ?";
        jdbcTemplate.update(sql, razorpayPaymentId, razorpaySignature, razorpayOrderId);
        sql = "DELETE FROM cart WHERE user_id = ?";
        jdbcTemplate.update(sql, userId);
    }

    public Discount getCoupon(String coupon) {
        String sql = "SELECT * FROM coupon WHERE code = ?";
        List<Discount> discount = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Discount.class), coupon);
        if (discount.isEmpty()) return null;
        return discount.get(0);
    }

    public List<Order> getOrders(String userId) {
        String sql = "SELECT * FROM orders WHERE user_id = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Order.class), userId);
    }
}
