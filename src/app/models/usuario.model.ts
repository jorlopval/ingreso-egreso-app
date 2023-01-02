

export class Usuario {

  static fromFireBase( { email='', uid='', nombre='' } ) {
    return new Usuario( uid, nombre, email );
  }


  constructor(
    public uid: string | null | undefined,
    public nombre: string,
    public email: string | null | undefined
  ){}

}
