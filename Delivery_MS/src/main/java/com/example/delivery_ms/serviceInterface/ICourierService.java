package com.example.delivery_ms.serviceInterface;

import com.example.delivery_ms.entity.Courier;
import java.util.List;

public interface ICourierService {

    List<Courier> getAllCouriers();

    Courier getCourierById(Long id);

    Courier createCourier(Courier courier);

    Courier updateCourier(Long id, Courier courier);

    boolean deleteCourier(Long id);
}
