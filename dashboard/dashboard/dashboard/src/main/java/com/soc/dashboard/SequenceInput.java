package com.soc.dashboard;
import java.util.List;
public class SequenceInput {
    private List<List<Double>> data;

    // Constructor, getters, and setters are needed for Java to convert this to JSON
    public SequenceInput(List<List<Double>> data) {
        this.data = data;
    }

    public List<List<Double>> getData() {
        return data;
    }

    public void setData(List<List<Double>> data) {
        this.data = data;
    }
}
