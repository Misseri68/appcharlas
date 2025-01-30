export class Profesor {
    constructor(
        public idUsuario: number,
        public usuario: string,
        public estadoUsuario: boolean,
        public imagen: string,
        public email: string,
        public idRole: number,
        public role: string,
        public idCurso: number,
        public curso: string,
        public fechaInicioCurso: string,
        public fechaFinCurso: string,
        public idCursosUsuarios: number
    ){}
}