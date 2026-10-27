package com.klef.soa.docker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.WaterTankRequest;
import com.klef.soa.docker.entity.WaterTank;
import com.klef.soa.docker.repository.WaterTankRepository;

@Service
public class WaterTankServiceImpl implements WaterTankService {

    @Autowired
    public WaterTankRepository tankRepository;

    @Override
    public WaterTank addTank(WaterTankRequest t) {

        WaterTank tank = new WaterTank();

        tank.setTankcode(t.getTankcode());
        tank.setCapacityLitres(t.getCapacityLitres());
        tank.setMaterial(t.getMaterial());
        tank.setInstalledDate(t.getInstalledDate());

        return tankRepository.save(tank);
    }

    @Override
    public String updateTank(WaterTank t) {

        boolean flag = tankRepository.existsById(t.getId());

        if (flag) {
            tankRepository.save(t);
            return "Water tank updated successfully";
        } else {
            return "Water tank ID not found";
        }
    }

    @Override
    public void deleteTank(Long id) {
        tankRepository.deleteById(id);
    }

    @Override
    public List<WaterTank> displayAllEvents() {
        return tankRepository.findAll();
    }
}
