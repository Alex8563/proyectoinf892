import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Registro de nuevo cliente
  @Post('registrar')
  async registrar(
    @Body('nombre') nombre: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const usuario = await this.authService.registrar(nombre, email, password)
    return {
      mensaje: 'Usuario registrado. Verifique su correo con el código enviado.',
      usuario,
    }
  }

  // Verificación de cuenta
  @Post('verificar')
  async verificar(
    @Body('email') email: string,
    @Body('codigo') codigo: string,
  ) {
    const verificado = await this.authService.verificarCuenta(email, codigo)
    return verificado
      ? { mensaje: 'Cuenta verificada correctamente.' }
      : { mensaje: 'Código inválido o usuario no encontrado.' }
  }

  // Login
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const token = await this.authService.login(email, password)
    if (!token) {
      return { mensaje: 'Credenciales inválidas o cuenta no verificada.' }
    }
    return token
  }
}
