package com.reclaim.backend.auth;

import com.reclaim.backend.user.UserResponse;

public record LoginResponse(String token, UserResponse user) {
}
