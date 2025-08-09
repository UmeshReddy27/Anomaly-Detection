package com.soc.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

@RestController
public class AnalysisController {

    @Autowired
    private MLAnalysisService mlAnalysisService;

    // We create a test endpoint at /api/test-analysis
    @PostMapping("/api/test-analysis")
    public Mono<AnalysisResult> testAnalysis() {
        // 1. Create fake data that matches the required size.
        //    Ask your friend what SEQUENCE_LENGTH and N_FEATURES are.
        //    Here's an example for a 5x3 array.
        List<List<Double>> sampleData = Arrays.asList(
                Arrays.asList(0.1, 0.2, 0.3),
                Arrays.asList(0.4, 0.5, 0.6),
                Arrays.asList(0.7, 0.8, 0.9),
                Arrays.asList(1.0, 1.1, 1.2),
                Arrays.asList(1.3, 1.4, 1.5)
        );
        SequenceInput requestData = new SequenceInput(sampleData);

        // 2. Call our service with the fake data
        System.out.println("Sending data to Python ML service...");
        return mlAnalysisService.analyze(requestData);
    }


}
