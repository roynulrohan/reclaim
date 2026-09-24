package com.reclaim.backend.config;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

// The encoder signs tokens at login. The decoder checks the signature and expiry on every request.
// Both use the same secret (HS256), so JWT_SECRET must stay private.
@Configuration
public class JwtConfig {

    @Bean
    JwtEncoder jwtEncoder(JwtProperties jwtProperties) {
        return NimbusJwtEncoder.withSecretKey(secretKey(jwtProperties)).build();
    }

    @Bean
    JwtDecoder jwtDecoder(JwtProperties jwtProperties) {
        return NimbusJwtDecoder.withSecretKey(secretKey(jwtProperties)).macAlgorithm(MacAlgorithm.HS256).build();
    }

    private static SecretKey secretKey(JwtProperties jwtProperties) {
        byte[] secret = jwtProperties.secret().getBytes(StandardCharsets.UTF_8);
        // HS256 needs a key of at least 256 bits.
        if (secret.length < 32) {
            throw new IllegalStateException("JWT_SECRET must be at least 32 characters long.");
        }
        return new SecretKeySpec(secret, "HmacSHA256");
    }
}
