import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ConfirmLetterData } from './confirmLetterSchema';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
});

interface EmployeeConfirmationLetterProps {
  data: ConfirmLetterData;
}

const EmployeeConfirmationLetter: React.FC<EmployeeConfirmationLetterProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Employee Confirmation Letter</Text>
        <Text style={styles.text}>Dear {data.salutation} {data.firstName} {data.lastName},</Text>
        <Text style={styles.text}>
          We are pleased to confirm your employment with our company in the position of {data.position}.
        </Text>
        <Text style={styles.text}>
          Your employment will commence on {new Date(data.joiningDate).toLocaleDateString()} with an annual salary of ${data.salary}.
        </Text>
        <Text style={styles.text}>
          You are entitled to {data.leaves} days of annual leave and your notice period is {data.noticePeriod} days.
        </Text>
        <Text style={styles.text}>
          Your standard working hours will be {data.workingHours} hours per day.
        </Text>
        <Text style={styles.text}>
          Your employee identification number is: {data.identificationNumber}.
        </Text>
        <Text style={styles.text}>
          We look forward to your contributions to our team.
        </Text>
        <Text style={styles.text}>
          Sincerely,
        </Text>
        <Text style={styles.text}>
          Human Resources Department
        </Text>
      </View>
    </Page>
  </Document>
);

export default EmployeeConfirmationLetter;

