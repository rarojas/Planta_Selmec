package com.selmec.Utils;

/**
 *
 * @author rrojase
 */
public class RandomGenerator {
    
    public double GenerateRamdom(double value,double variance)
    {
        value *= (1 + (Math.random() * 0.01 * variance * (Math.random() < .5 ? -1:1)));
        return value;
    }
}
