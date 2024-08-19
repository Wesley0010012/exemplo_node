import { CreateProductService } from '@modules/products/services/create-product.service';
import { DeleteProductService } from '@modules/products/services/delete-product.service';
import { ListProductService } from '@modules/products/services/list-product.service';
import { ShowProductService } from '@modules/products/services/show-product.service';
import { UpdateProductService } from '@modules/products/services/update-product.service';
import { Request, Response } from 'express';

export class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();

    await createProduct.execute({ name, price, quantity });

    return response.json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return response.json();
  }
}
