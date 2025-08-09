package com.soc.dashboard;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;
@RestController
public class HealthController {
    @GetMapping("/api/health")
    public Map<String, String> healthCheck() {
        // This returns a simple JSON object: {"status": "Backend is running! 🚀"}
        return Collections.singletonMap("status", "Backend is running! 🚀");
    }
}
