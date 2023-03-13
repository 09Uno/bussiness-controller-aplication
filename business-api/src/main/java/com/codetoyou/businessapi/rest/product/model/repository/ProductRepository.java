package com.codetoyou.businessapi.rest.product.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.codetoyou.businessapi.rest.product.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
