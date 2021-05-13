export const resolvers = {
  Query: {
    principal(_parent, _args, _context, _info) {
      return { id: 1, name: "Guest", status: "offline" }
    }
  }
}
