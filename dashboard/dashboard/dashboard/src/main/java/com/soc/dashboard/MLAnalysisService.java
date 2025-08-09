// src/main/java/com/soc/dashboard/MLAnalysisService.java
package com.soc.dashboard;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class MLAnalysisService {

    private final WebClient webClient;

    public MLAnalysisService() {
        // --- IMPORTANT CHANGE FOR SAME LAPTOP ---
        this.webClient = WebClient.builder()
                .baseUrl("http://localhost:8000") // Use localhost for the Python server
                .build();
    }

    public Mono<AnalysisResult> analyze(SequenceInput sequence) {
        return this.webClient.post()
                .uri("/analyze")
                .bodyValue(sequence)
                .retrieve()
                .bodyToMono(AnalysisResult.class);
    }
}