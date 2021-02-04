const { ApolloServer, gql } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
let ids = 4;

console.log('start')

// const students =
//   [
//     {
//       "id": "1",
//       "name": "Nazim",
//       "email": "abc@gmail.com",
//       "age": 22
//     },

//     {
//       "id": "2",
//       "name": "Ali",
//       "email": "def@gmail.com",
//       "age": 22
//     },

//     {
//       "id": "3",
//       "name": "Khan",
//       "email": "ghi@gmail.com",
//       "age": 22
//     },

//     {
//       "id": "4",
//       "name": "Jan",
//       "email": "jkl@gmail.com",
//       "age": 20
//     }
//   ]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    //first student is from query and after the arrow function the student comes from the hardcode data
    // we can write business logic here
    students: async () => { 
      return await prisma.student.findMany()
    }
      
  
  },
  Mutation: {

    // addStudent: (root, args, context, info) => {
    //   console.log(args.input)
    //   ids = ids + 1
    //   students.push(
    //     {

    //       id: ids,
    //       name: args.input.name,
    //       email: args.input.email,
    //       age: args.input.age
    //     }
    //   )
    //   return {
    //     id: ids,
    //     name: args.input.name,
    //     email: args.input.email,
    //     age: args.input.age
    //   }

    // },

    addStudent: async (parent, data) => {
      return await prisma.student.create({ data });
      
    },

    updateStudent: async (root,{id ,...data})=>{
       const student= await prisma.student.update({
        where:{id},
        data
      })
      return student;
      
    },
    deleteStudent: async(parent,{id,...args},ctx,info) => {
      
      const student= await prisma.student.delete({
        
        where:{id}
      })
 
      return "deleted value"
    }
    // updateStudent: (root, { id, input }, context, info) => {
    //   // check whether the payload is exists
    //   const ind = students.findIndex((st) => st.id == id);
    //   if (ind === -1) throw new ApolloServer('Student not found...')

    //   // validate the payload


    //   // mutate the payload
    //   students[ind] = {
    //     ...students[ind],
    //     ...input
    //   }

    //   // return the predefined response
    //   return students[ind];
    // },
    // deleteStudent: () => {
    //   const ind = students.findIndex(std => std.id == args.id);
    //   if (ind === -1) throw new ApolloServer("Student not found...");

    //   students.splice(ind, 1);

    //   return "Success"
    // }



  }
};


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`


  type Student {
    id: Int!
    name: String!
    email: String!
    age: Int
  }
  

  type Query {
    students: [Student]
  }

  type Mutation {
    # addStudent is just name
    addStudent(name:String!,email:String!,age:Int): Student!
    updateStudent(id: Int!,name:String!,email:String,age:Int): Student!
    deleteStudent(id:Int!):String!
    # deleteStudent(id: Int!): String!
  }
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});