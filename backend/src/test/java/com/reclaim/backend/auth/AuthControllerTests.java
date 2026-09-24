package com.reclaim.backend.auth;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.assertj.MockMvcTester;
import org.springframework.transaction.annotation.Transactional;

import com.reclaim.backend.user.Role;
import com.reclaim.backend.user.User;
import com.reclaim.backend.user.UserRepository;

// Runs against the database in your .env. @Transactional rolls back after each test,
// so the test user never stays in the database.
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class AuthControllerTests {

    @Autowired
    private MockMvcTester mvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    private User testUser;

    @BeforeEach
    void createTestUser() {
        testUser = userRepository.save(new User("test-staff", passwordEncoder.encode("correct-password"), Role.STAFF));
    }

    @Test
    void loginWithCorrectPasswordReturnsTokenAndUser() {
        assertThat(mvc.post().uri("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        { "username": "test-staff", "password": "correct-password" }
                        """))
                .hasStatusOk()
                .bodyJson()
                .extractingPath("$.user.username").isEqualTo("test-staff");
    }

    @Test
    void loginWithWrongPasswordIsRejected() {
        assertThat(mvc.post().uri("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        { "username": "test-staff", "password": "wrong-password" }
                        """))
                .hasStatus(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void meWithoutTokenIsRejected() {
        assertThat(mvc.get().uri("/api/auth/me"))
                .hasStatus(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void meWithTokenReturnsCurrentUser() {
        String token = tokenService.createToken(testUser);

        assertThat(mvc.get().uri("/api/auth/me").header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
                .hasStatusOk()
                .bodyJson()
                .extractingPath("$.role").isEqualTo("STAFF");
    }
}
