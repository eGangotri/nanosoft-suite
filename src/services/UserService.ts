import nanosoftPrisma from "@/lib/prisma";

export const getEmployeeByUserId = async (userId: string):
    Promise<EmployeeData | null> => {
    const response = await fetch(`/api/user-employee/${userId}`)
    if (!response.ok) {
        return null;
    } else {
        const data: EmployeeData = await response.json()
        return data
    }
}

export const getUserByEmployeeId = async (employeeId: number):
    Promise<EmployeeData | null> => {
    const response = await fetch(`/api/employee/${employeeId}`)
    if (!response.ok) {
        return null;
    } else {
        const data: EmployeeData = await response.json()
        return data
    }
}

export async function getUserWithRelations(userId:string) {
  try {
    const user = await nanosoftPrisma.user.findUnique({
      where: { id: userId },
      include: {
        UserRole: {
          include: {
            Role: true
          }
        },
        Tenant: true,
        UserEmployee: {
          include: {
            Employee: true
          }
        }
      }
    })

    console.log(JSON.stringify(user, null, 2))
    return user
  } catch (error) {
    console.error('Error fetching user data:', error)
  } 
}
