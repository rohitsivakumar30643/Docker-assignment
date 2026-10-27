package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.WaterTankRequest;
import com.klef.soa.docker.entity.WaterTank;
import com.klef.soa.docker.service.WaterTankService;

@RestController
@RequestMapping("/watertank")
@CrossOrigin(origins = "http://localhost:3000")
public class WaterTankController {

    @Autowired
    public WaterTankService controller;

    @GetMapping("/")
    public String home() {
        return "Water Tank Service is running";
    }

    @PostMapping("/Add")
    public ResponseEntity<String> add(@RequestBody WaterTankRequest tank) {
        controller.addTank(tank);
        return ResponseEntity.status(201).body("Water tank added successfully");
    }

    @GetMapping("/DisplayAll")
    public ResponseEntity<?> displayAll() {
        List<WaterTank> list = controller.displayAllEvents();

        if (list.size() > 0) {
            return ResponseEntity.ok(list);
        } else {
            return ResponseEntity.status(404).body("No water tank data is present");
        }
    }

    @PutMapping("/Update")
    public ResponseEntity<String> update(@RequestBody WaterTank tank) {
        String result = controller.updateTank(tank);

        if (result.equals("Water tank updated successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(404).body(result);
        }
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        controller.deleteTank(id);
        return ResponseEntity.ok("Water tank deleted successfully");
    }
}