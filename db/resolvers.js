const Usuario = require('../models/Usuario');
const Categoria = require('../models/Categoria');
const Emprendimiento = require('../models/Emprendimiento');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Producto = require('../models/Producto');
require('dotenv').config({ path: 'variables.env'});

//crea y firma un webToken
const crearToken = (usuario, secreta, expiresIn) => {
    const { id, email} = usuario;

    return jwt.sign({ id, email}, secreta, {expiresIn} );
}

const resolvers = {
    Query: {
        obtenerCategorias: async (_, {id}) => {
            const categorias = await Categoria.find({id});
            return categorias;
        },

        obtenerEmprendimientos: async (_, {input}) => {
            const emprendimientos = await Emprendimiento.where('categoria').equals(input.categoria);

            return emprendimientos;
        },

        obtenerProductos: async (_, {input}) => {
            const productos = await Producto.where('perteneceA').equals(input.perteneceA);

            return productos;
        }
       
    },
    Mutation: {
        crearUsuario: async (_, {input}) => {
            const {email, password} = input;

            const existeUsuario = await Usuario.findOne({email});

            //si el usuario existe
            if(existeUsuario) {
                throw new Error('El usuario ya está registrado');
            }

            try {
                //Hashear password
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password, salt);
                console.log(input);

                //Registrar nuevo usuario
                const nuevoUsuario = new Usuario(input);
                console.log(nuevoUsuario);

                nuevoUsuario.save();
                return "Usuario creado correctamente";
            } catch (error) {
                console.log(error);
            }

        },
        autenticarUsuario:  async (_, {input}) => {
            const { email, password} = input;

            // Si el usuario existe
            const existeUsuario = await Usuario.findOne({ email });

            // si el usuario existe
            if(!existeUsuario) {
                throw new Error('El Usuario no existe');
            }

            // Si el password es correcto
            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if(!passwordCorrecto) {
                throw new Error('Password Incorrecto');
            }

            // Dar acceso a la app
            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '2hr' )
            }
        },
        nuevaCategoria: async (_, {input}) => {
            const {nombre} = input;
            //Revisar si el nombre de categoría ta existe
            const existeCategoria = await Categoria.findOne({nombre});
            if(existeCategoria) {
                throw new Error('El nombre de la categoría ya existe');
            }

            try {
                const categoria = new Categoria(input);

                //Almacenar en la BD
                const resultado = await categoria.save();

                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        actualizarCategoria: async (_, {id, input}) => {
            const {nombre} = input;
            //Revisar si la categoría existe
            let categoria = await Categoria.findById(id);

            if(!categoria) {
                throw new Error('Categoría no encontrada');
            }

            //Revisar si el nombre de categoría ya existe
            const existeCategoria = await Categoria.findOne({nombre});
            if(existeCategoria) {
                throw new Error('El nombre de la categoría ya existe');
            }

            //Actualizar el proyecto
            categoria = await Categoria.findOneAndUpdate({ _id: id}, input, {new: true});
            return categoria;
        },
        eliminarCategoria: async (_, { id }) => {
            //Revisar si la categoría existe
            let categoria = await Categoria.findById(id);

            if(!categoria) {
                throw new Error('Categoría no encontrada');
            }

            //Eliminar
            await Categoria.findOneAndDelete({ _id : id });

            return "Categoría eliminada";
        },
        nuevoEmprendimiento: async (_, {input}) => {
            //Revisar si el nombre del emprendimiento ya existe
            const {nombre} = input;
            const {CedJuridica} = input;
            const existName = await Emprendimiento.findOne({nombre});
            const existJuridic = await Emprendimiento.findOne({CedJuridica});

            if(existName) {
                throw new Error('El nombre del emprendimiento ya existe');
            }else if (existJuridic) {
                throw new Error('La Cédula Jurídica ya esiste');
            }

            try {
                const emprendimiento = new Emprendimiento(input);

                //Almacenar en la BD
                const resultado = await emprendimiento.save();

                return resultado;
            } catch (error) {
                console.log(error);
            }
        }, 
        editarEmprendimiento: async (_, { id, input}) => {
            //revisar si el emprendimiento existe
            let emprendimiento = await Emprendimiento.findById( id );

            if (!emprendimiento) {
                throw new Error('El emprendimiento no existe');
            }
            /*//Revisar si el nombre y cédula jurídica del emprendimiento ya existe
            const {nombre} = input;
            const {CedJuridica} = input;
            const existName = await Emprendimiento.findOne({nombre});
            const existJuridic = await Emprendimiento.findOne({CedJuridica});
            if(existName) {
                throw new Error('El nombre del emprendimiento ya existe');
            }else if (existJuridic) {
                throw new Error('La Cédula Jurídica ya esiste');
            }*/

            //Guardar y retornar emprendimiento
            emprendimiento = await Emprendimiento.findOneAndUpdate({_id : id}, input, { new: true});

            return emprendimiento;
        },
        eliminarEmprendimiento: async (_, { id } ) => {
            //revisar si el emprendimiento existe
            let emprendimiento = await Emprendimiento.findById( id );

            if (!emprendimiento) {
                throw new Error('El emprendimiento no existe');
            }

            //Eliminar
            await Emprendimiento.findOneAndDelete({ _id: id});
            return "Emprendimiento eliminado";
        },
        nuevoProducto: async (_, {input}) => {
              //Revisar si el nombre del emprendimiento ya existe ????????'
            

            try {
                const producto = new Producto(input);

                //Almacenar en la BD
                const resultado = await producto.save();

                return resultado;
            } catch (error) {
                console.log(error);
            }
        },
        editarProducto: async (_, { id, input }) => {
            //Verificar que el producto exista
            let producto = Producto.findById(id);

            if (!producto) {
                throw new Error('El producto que busca no existe')
            }
            //Guardar y retornar producto
            producto = await Producto.findOneAndUpdate({_id : id}, input, { new: true});

            return producto;
        },
        eliminarProducto: async (_, { id } ) => {
            //revisar si el emprendimiento existe
            let producto = await Producto.findById( id );

            if (!producto) {
                throw new Error('El producto no existe');
            }

            //Eliminar
            await Producto.findOneAndDelete({ _id: id});
            return "Producto eliminado";
        }
    }
}

module.exports = resolvers;