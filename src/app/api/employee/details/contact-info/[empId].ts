export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  
    const { employeeId } = req.query;
    const empId = Number(employeeId);
  
    if (isNaN(empId)) {
      return res.status(400).json({ message: 'Invalid employee ID' });
    }
  
    try {
      const contacts = await prisma.employeeEmergencyContact.findMany({
        where: { employeeId: empId },
      });
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching employee emergency contacts:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }