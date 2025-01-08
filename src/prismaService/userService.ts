import nanosoftPrisma from "@/lib/prisma";

export const getUserEmployeeByEmail = async (email:string = "", tenantId:number = 0) => {
    const user = await nanosoftPrisma.user.findUnique({
      where: {
        email_tenantId: {
          email,
          tenantId,
        }
      },
      include: {
        UserRole: {
          include: {
            Role: {
              select: {
                name: true,
              }
            }
          }
        },
        UserEmployee: {
          include: {
            Employee: {
              select: {
                empId: true,
                firstName: true,
                lastName: true,
                email: true,
                designation: true,
                EmployeeHrDetails: {
                  select: {
                    salary: true,
                    dateOfJoining: true
                  }
                }
              }
            }
          }
        }
      }
    });
  
    console.log('Found user:', user);
    return user;
  }
  