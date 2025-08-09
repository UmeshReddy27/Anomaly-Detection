// src/main/java/com/soc/dashboard/AnalysisResult.java
package com.soc.dashboard;

import java.util.Map;

public class AnalysisResult {
    // Fields are private
    private boolean is_anomaly;
    private double anomaly_score;
    private Map<String, Object> explanation;

    // ---- Generated Getters and Setters ----

    public boolean isIs_anomaly() {
        return is_anomaly;
    }

    public void setIs_anomaly(boolean is_anomaly) {
        this.is_anomaly = is_anomaly;
    }

    public double getAnomaly_score() {
        return anomaly_score;
    }

    public void setAnomaly_score(double anomaly_score) {
        this.anomaly_score = anomaly_score;
    }

    public Map<String, Object> getExplanation() {
        return explanation;
    }

    public void setExplanation(Map<String, Object> explanation) {
        this.explanation = explanation;
    }
}