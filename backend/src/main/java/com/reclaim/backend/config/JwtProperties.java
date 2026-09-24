package com.reclaim.backend.config;

import java.time.Duration;

import org.springframework.boot.context.properties.ConfigurationProperties;

// secret comes from JWT_SECRET; expiry is how long a login lasts.
@ConfigurationProperties("app.jwt")
public record JwtProperties(String secret, Duration expiry) {
}
