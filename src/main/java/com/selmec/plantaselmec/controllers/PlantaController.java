package com.selmec.plantaselmec.controllers;

import com.selmec.Utils.RandomGenerator;
import com.selmec.plantaselmec.dto.LecturaPSC;
import org.springframework.stereotype.Controller;
import java.util.Date;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class PlantaController { 
    
    @Autowired
    RandomGenerator randomGenerator;
    
    @RequestMapping(value ="/GetValues", method = RequestMethod.GET)
    public @ResponseBody LecturaPSC GetValues() {    	
        LecturaPSC result = new LecturaPSC();
        result.Time = new Date().toString();
        result.L1N = randomGenerator.GenerateRamdom(120, 1);        
        result.L2N = randomGenerator.GenerateRamdom(120, 1);        
        result.L3N = randomGenerator.GenerateRamdom(120, 1);        
        result.Presion = randomGenerator.GenerateRamdom(10, 1);      
        result.Temp = randomGenerator.GenerateRamdom(80, 5);      
        result.HZ = randomGenerator.GenerateRamdom(60, 5);        
        result.L2L3 = randomGenerator.GenerateRamdom(120, 1);
        result.L3L1 = randomGenerator.GenerateRamdom(120, 1);
        result.L1L2 = randomGenerator.GenerateRamdom(120, 1);        
        return result;
    }
}