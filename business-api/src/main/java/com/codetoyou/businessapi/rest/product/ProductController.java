package com.codetoyou.businessapi.rest.product;

import com.codetoyou.businessapi.rest.product.model.Product;
import com.codetoyou.businessapi.rest.product.model.repository.ProductRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
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


//faz com que a classe seja um controlador REST
@RestController
//URL base para o controlador
@RequestMapping("/api/products")

// @CrossOrigin(origins = "http://localhost:3000")
//Faz com que a API aceite requisições de qualquer origem
@CrossOrigin(origins = "*")
public class ProductController {

  @Autowired
  private ProductRepository productRepository; // conecta com o banco de dados

  @GetMapping // busca todos os produtos
  public List<ProductRequest> getList() {
    return productRepository
      .findAll()
      .stream()
      .map(ProductRequest::fromModel)
      .collect(Collectors.toList());
  }

  @GetMapping("{id}") // busca o produto pelo id
  public ResponseEntity<ProductRequest> find(@PathVariable Long id) {
    Optional<Product> productExist = productRepository.findById(id); // busca o produto pelo id
    if (productExist.isPresent()) {
      return ResponseEntity.ok(ProductRequest.fromModel(productExist.get())); // retorna o produto caso exista
    }

    var product = productExist.map(ProductRequest::fromModel).get(); // converte o objeto para o modelo do banco de dados
    return ResponseEntity.ok(product); // retorna o produto caso exista
  }

  @PostMapping
  public ProductRequest save(@RequestBody ProductRequest productRequest) {
    Product productEntity = productRequest.toModel(); // converte o objeto para o modelo do banco de dados

    productRepository.save(productEntity); // salva no banco de dados

    return ProductRequest.fromModel(productEntity); // retorna o objeto salvo no banco de dados
  }

  @PutMapping("{id}") // atualiza o produto
  public ResponseEntity<Void> update(
    @PathVariable Long id,
    @RequestBody ProductRequest productRequest
  ) {
    Optional<Product> product = productRepository.findById(id); // busca o produto pelo id

    if (!product.isPresent()) {
      return ResponseEntity.notFound().build(); // retorna um erro caso o produto não exista
    }

    Product productEntity = productRequest.toModel(); // converte o objeto para o modelo do banco de dados
    productEntity.setId(id); // seta o id do produto
    productRepository.save(productEntity); // salva no banco de dados

    return ResponseEntity.ok().build(); // retorna o objeto salvo no banco de dados
  }

  @DeleteMapping("{id}") // deleta o produto
  public ResponseEntity<Void> del(@PathVariable Long id) {
    Optional<Product> product = productRepository.findById(id); // busca o produto pelo id

    if (!product.isPresent()) {
      return ResponseEntity.notFound().build(); // retorna um erro caso o produto não exista
    }

    productRepository.delete(product.get()) ; // deleta o produto
    return ResponseEntity.noContent().build(); // retorna um status 204
  }
  // @GetMapping("/list")
  // public String list() {
  //   return "List";
  // }
}
