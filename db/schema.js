const { gql } = require('apollo-server');

const typeDefs = gql`
    type Token {
        token: String
    }

    type Categoria {
        nombre: String
        id: ID
    }
    
    type Producto {
        id: ID
        nombre: String!
        perteneceA: String!
        foto: String!
    }

    type Emprendimiento {
        nombre: String!
        id: ID
        CedJuridica: String!
        categoria: String!
        telCelular: String!
        distrito: String!
        direccion: String!
        email: String!
        descripcion: String!
        archivosMultimedia: String!
    }

    type Query {
        obtenerCategorias : [Categoria]

        obtenerEmprendimientos(input: CategoIDInput) : [Emprendimiento]

        obtenerProductos(input: EmprendiIDInput) : [Producto]
    }

    input CategoIDInput {
        categoria: String!
    }

    input EmprendiIDInput {
        perteneceA: String!
    }

    
    input UsarioInput{
        nombre: String!
        email: String!
        password: String!
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    input CategoriaInput {
        nombre: String!
    }

    input ProductoInput {
        nombre: String!
        perteneceA: String!
        foto: String!
    }

    input EmprendimientoInput {
        nombre: String!
        CedJuridica: String!
        categoria: String!
        telCelular: String!
        distrito: String!
        direccion: String!
        email: String!
        descripcion: String!
        archivosMultimedia: String!        
    }

    type Mutation {
        crearUsuario(input: UsarioInput) : String
        autenticarUsuario(input: AutenticarInput) : Token

        nuevaCategoria(input: CategoriaInput) : Categoria
        actualizarCategoria(id : ID!, input: CategoriaInput) : Categoria
        eliminarCategoria(id: ID!) : String

        nuevoEmprendimiento(input: EmprendimientoInput) : Emprendimiento
        editarEmprendimiento(id : ID!, input: EmprendimientoInput) : Emprendimiento
        eliminarEmprendimiento(id : ID!) : String

        nuevoProducto(input: ProductoInput) : Producto
        editarProducto(id : ID!, input: ProductoInput) : Producto
        eliminarProducto(id : ID!) : String
    }
`;

module.exports = typeDefs;