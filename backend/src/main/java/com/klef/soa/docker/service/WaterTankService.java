
package com.klef.soa.docker.service;

import java.util.List;


import com.klef.soa.docker.dto.WaterTankRequest;

import com.klef.soa.docker.entity.WaterTank;

public interface WaterTankService {

    WaterTank addTank(WaterTankRequest t);

    String updateTank(WaterTank t);

    void deleteTank(Long id);

    List<WaterTank> displayAllEvents();
}
