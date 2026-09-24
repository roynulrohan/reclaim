package com.reclaim.backend.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

// Frontend addresses allowed to call the API, from CORS_ALLOWED_ORIGINS (comma-separated).
@ConfigurationProperties("app.cors")
public record CorsProperties(List<String> allowedOrigins) {
}
