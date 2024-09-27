package com.dbms.project.controller;

import com.dbms.project.models.Discount;
import com.dbms.project.models.Order;
import com.dbms.project.repository.OrderRepository;
import com.dbms.project.services.JWTService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping(value="/api/order", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {
    private final JWTService jwtService;
    private final OrderRepository orderRepository;


    @Data
    static private class Transaction {
        private String discountId;
    }
    @PostMapping("/getId")
    public String getId(@RequestBody Transaction transaction, @RequestHeader("Authorization") String token) throws IOException {
        String userId = jwtService.extractUserName(token.substring(7));
        return orderRepository.generateOrderId(transaction.getDiscountId(), userId);
    }

    @Data
    static private class RazorPay {
        private String razorpay_order_id;
        private String razorpay_payment_id;
        private String razorpay_signature;
    }
    private static String hmacSha256(String data, String secret) throws NoSuchAlgorithmException, InvalidKeyException {
        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256_HMAC.init(secret_key);
        byte[] hash = sha256_HMAC.doFinal(data.getBytes(StandardCharsets.UTF_8));
//        return Base64.getEncoder().encodeToString(hash);
        return new BigInteger(1, hash).toString(16);
    }
    @PostMapping("/verify")
    public String verify(@RequestBody RazorPay razorPay, @RequestHeader("Authorization") String token) throws IOException, NoSuchAlgorithmException, InvalidKeyException {
        String userId = jwtService.extractUserName(token.substring(7));
        String generated_signature = hmacSha256(razorPay.razorpay_order_id + "|" + razorPay.razorpay_payment_id, "auOBpfnaFr7Ek2QBQtZbuaep");
        if (!generated_signature.equals(razorPay.razorpay_signature)) return "FAILED";
        orderRepository.updatePayment(razorPay.getRazorpay_order_id(), razorPay.getRazorpay_payment_id(), razorPay.getRazorpay_signature(), userId);
        return "SUCCESS";
    }

    @PostMapping("/getCoupon")
    public Discount getCoupon(@RequestBody String coupon, @RequestHeader("Authorization") String token) throws IOException {
        return orderRepository.getCoupon(coupon);
    }

    @GetMapping("/get")
    public List<Order> getOrders(@RequestHeader("Authorization") String token) throws IOException {
        String userId = jwtService.extractUserName(token.substring(7));
        return orderRepository.getOrders(userId);
    }
}
