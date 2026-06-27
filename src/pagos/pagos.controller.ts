import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common'
import { PagosService } from './pagos.service'
import { Pago } from './pagos.entity'

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  // Registrar un pago
  @Post('registrar')
  async registrarPago(
    @Body('usuarioId') usuarioId: number,
    @Body('cursoId') cursoId: number,
    @Body('monto') monto: number,
  ): Promise<Pago> {
    return await this.pagosService.registrarPago(usuarioId, cursoId, monto)
  }

  // Listar todos los pagos
  @Get('listar')
  async listarPagos(): Promise<Pago[]> {
    return await this.pagosService.listarPagos()
  }

  // Listar pagos de un usuario
  @Get('usuario/:usuarioId')
  async listarPagosPorUsuario(@Param('usuarioId') usuarioId: number): Promise<Pago[]> {
    return await this.pagosService.listarPagosPorUsuario(usuarioId)
  }

  // Listar pagos de un curso
  @Get('curso/:cursoId')
  async listarPagosPorCurso(@Param('cursoId') cursoId: number): Promise<Pago[]> {
    return await this.pagosService.listarPagosPorCurso(cursoId)
  }

  // Eliminar un pago
  @Delete('eliminar/:id')
  async eliminarPago(@Param('id') id: number): Promise<{ mensaje: string }> {
    const eliminado = await this.pagosService.eliminarPago(id)
    return eliminado
      ? { mensaje: 'Pago eliminado correctamente.' }
      : { mensaje: 'No se encontró el pago.' }
  }
}
