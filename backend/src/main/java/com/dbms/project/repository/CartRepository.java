package com.dbms.project.repository;

import com.dbms.project.models.CartItem;
import com.dbms.project.models.Lens;
import com.dbms.project.models.Product;
import com.dbms.project.models.ProductType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Configuration
@RequiredArgsConstructor
public class CartRepository {
    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public boolean updateQuantity(String userId, String id, int quantity) {
        if (quantity == 0) {
            String sql = "DELETE FROM cart WHERE user_id = ? AND id = ?";
            int rowsChanged = jdbcTemplate.update(sql, userId, id);
            return rowsChanged != 0;
        } else {
            String sql = "UPDATE cart SET quantity = ? WHERE user_id = ? AND id = ?";
            int rowsChanged = jdbcTemplate.update(sql, quantity, userId, id);
            return rowsChanged != 0;
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static
    class productTypeClass {
        private String productType;
    }
    public boolean addProduct(String userId, String productId, String lensId, int quantity) {
        String sql = "SELECT product_type FROM products WHERE id = ?";
        List<productTypeClass> productTypeClassList = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(productTypeClass.class), productId);
        String productType = productTypeClassList.get(0).getProductType();
        assert productType != null;
        if (lensId == null && productType.equals("GLASSES")) {
            return false;
        }
        try {
            if (quantity == 0) {
                sql = "DELETE FROM cart WHERE user_id = :user_id AND product_id = :product_id AND lens_id = :lens_id";
                namedParameterJdbcTemplate.update(sql, new org.springframework.jdbc.core.namedparam.MapSqlParameterSource()
                        .addValue("user_id", userId)
                        .addValue("product_id", productId)
                        .addValue("lens_id", lensId));
                return true;
            }
            sql = "UPDATE cart SET quantity = :quantity WHERE user_id = :user_id AND product_id = :product_id" + (lensId == null ? " AND lens_id IS NULL" : " AND lens_id = :lens_id");
            int rowsChanged = namedParameterJdbcTemplate.update(sql, new org.springframework.jdbc.core.namedparam.MapSqlParameterSource()
                    .addValue("quantity", quantity)
                    .addValue("user_id", userId)
                    .addValue("product_id", productId)
                    .addValue("lens_id", lensId));
            if (rowsChanged == 0) {
                sql = "INSERT INTO cart (user_id, product_id, lens_id, quantity) VALUES (:user_id, :product_id, :lens_id, :quantity)";
                namedParameterJdbcTemplate.update(sql, new org.springframework.jdbc.core.namedparam.MapSqlParameterSource()
                        .addValue("user_id", userId)
                        .addValue("product_id", productId)
                        .addValue("lens_id", lensId)
                        .addValue("quantity", quantity));
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<CartItem> getCart(String userId) {
        String sql = "SELECT * FROM cart LEFT JOIN products ON cart.product_id = products.id LEFT JOIN lens ON cart.lens_id = lens.id WHERE user_id = ? ";
        List<CartItem> products = jdbcTemplate.query(sql, (rs, rowNum) -> {
            CartItem cartItem = new CartItem();
            Product product = new Product();
            Lens lens = new Lens();
            cartItem.setId(rs.getString("cart.id"));
            cartItem.setQuantity(rs.getInt("cart.quantity"));
            product.setId(rs.getString("products.id"));
            product.setName(rs.getString("products.name"));
            product.setBrand(rs.getString("products.brand"));
            product.setPrice(rs.getDouble("products.price"));
            product.setImage(rs.getString("products.image"));
            product.setColor(rs.getString("products.color"));
            product.setDescription(rs.getString("products.description"));
            product.setCreatedAt(rs.getDate("products.created_at"));
            product.setProductType(ProductType.valueOf(rs.getString("products.product_type")));
            lens.setId(rs.getString("lens.id"));
            lens.setName(rs.getString("lens.name"));
            lens.setBrand(rs.getString("lens.brand"));
            lens.setPrice(rs.getDouble("lens.price"));
            lens.setImage(rs.getString("lens.image"));
            lens.setDescription(rs.getString("lens.description"));
            lens.setCreatedAt(rs.getDate("lens.created_at"));
            cartItem.setProduct(product);
            if (lens.getId() != null) cartItem.setLens(lens);
            return cartItem;
        }, userId);
        return products;
    }

    public boolean clearCart(String userId) {
        String sql = "DELETE FROM cart WHERE user_id = ?";
        int rowsChanged = jdbcTemplate.update(sql, userId);
        return rowsChanged != 0;
    }
}
