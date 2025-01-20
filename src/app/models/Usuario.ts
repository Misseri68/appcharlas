export class Usuario {
  constructor(
    public idUsuario: number,
    public nombre: string,
    public apellidos: string,
    public email: string,
    public estadoUsuario: boolean,
    public imagen: string,
    public password: string,
    public idRole: number,
    public role?: string,
    public curso?: string,
    public idCurso?: number
  ) {}
}
