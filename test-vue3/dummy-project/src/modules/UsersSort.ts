import User from '@/modules/User'

export function usersSortByName ({ users, reverse = false }: { users: User[]; reverse?: boolean }): User[] {
  const aIsLower = reverse ? 1 : -1
  const aIsHigher = reverse ? -1 : 1
  users.sort((a, b) => a.name && b.name && a.name.toUpperCase() < b.name.toUpperCase() ? aIsLower : aIsHigher)
  return users
}

export function usersSortByEmail ({ users, reverse = false }: { users: User[]; reverse?: boolean }): User[] {
  const aIsLower = reverse ? 1 : -1
  const aIsHigher = reverse ? -1 : 1
  users.sort((a, b) => a.email && b.email && a.email.toUpperCase() < b.email.toUpperCase() ? aIsLower : aIsHigher)
  return users
}

export function usersSortByAge ({ users, reverse = false }: { users: User[]; reverse?: boolean }): User[] {
  const aIsLower = reverse ? 1 : -1
  const aIsHigher = reverse ? -1 : 1
  users.sort((a, b) => a.age && b.age && a.age < b.age ? aIsLower : aIsHigher)
  return users
}
