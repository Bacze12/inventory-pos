// import { PrismaService } from '../../prisma/prisma.service';
// import { Request, Response } from 'express';

// export class TenantController {
//     public constructor(private readonly prisma: PrismaService) {}

//     public async createTenant(req: Request, res: Response): Promise<void> {
//         const { ecommerceUserId, moduleName } = req.body;
    
//         try {
//             // Registrar o actualizar el tenant
//             await this.prisma.tenant.upsert({
//                 where: { ecommerceUserId },
//                 update: { moduleData: moduleName }, // Cambiar `moduleData` al campo correcto en tu esquema
//                 create: { ecommerceUserId, moduleData: moduleName },
//             });
    
//             res.status(201).json({ message: 'Tenant creado o actualizado correctamente.' });
//         } catch (error) {
//             console.error('Error al crear tenant:', error);
//             res.status(500).json({ message: 'Error al crear tenant.', error: error.message });
//         }
//     }
    
// }
