import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  public constructor(private readonly prisma: PrismaService) {}

  public async create(createCategoryDto: CreateCategorieDto) {
    try {
      const data = {
        name: createCategoryDto.name,
        description: createCategoryDto.description,
        isActive: createCategoryDto.isActive ?? true, // Establece un valor predeterminado
        createdAt: createCategoryDto.createdAt ?? new Date(),
      };
      return await this.prisma.category.create({ data });
    } catch (error) {
      this.logError('Error creating category:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Category already exists', HttpStatus.CONFLICT);
        }
      }
      throw new HttpException(
        'Failed to create category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll() {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      this.logError('Error retrieving categories:', error);
      throw new HttpException(
        'Failed to retrieve categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private logError(message: string, error: any) {
    console.error(message, error);
  }

  public async findOne(id: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id: id },
      });
  
      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
  
      return category;
    } catch (error) {
      this.logError('Error retrieving category:', error);
      throw new HttpException(
        'Failed to retrieve category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  

  public async update(id: string, updateCategoryDto: Partial<CreateCategorieDto>) {
    try {
      const existingCategory = await this.prisma.category.findUnique({
        where: { id: id },
      });

      if (!existingCategory) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: {
          ...updateCategoryDto,
        },
      });

      return updatedCategory;
    } catch (error) {
      this.logError('Error updating category:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Category already exists', HttpStatus.CONFLICT);
        }
      }
      throw new HttpException(
        'Failed to update category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async remove(id: string) {
    try {
      return await this.prisma.category.delete({
        where: { id:id },
      });
    } catch (error) {
      this.logError('Error deleting category:', error);
      throw new HttpException(
        'Failed to delete category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async toggleActiveStatus(id: string, isActive: boolean) {
    try {
      const existingCategory = await this.prisma.category.findUnique({
        where: { id: id },
      });
  
      if (!existingCategory) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
  
      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: {
          isActive, // Actualiza el estado de la categoría
        },
      });
  
      return updatedCategory;
    } catch (error) {
      this.logError('Error updating category status:', error);
      throw new HttpException(
        'Failed to update category status',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
}
