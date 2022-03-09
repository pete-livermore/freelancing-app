import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 25,
    fontSize: 12,
  },
  details: {
    paddingTop: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 35,
  },
  detailscontainerbox: {
    width: '46%',
  },
  detailsbox: {
    border: '1px solid black',
    marginBottom: 15,
    padding: 5
  },
  summaryTableContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 50
  },
  table: {
    fontSize: 11,
    display: "table",
    width: "auto",
    marginHorizontal: "25",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  summaryTable: {
    fontSize: 11,
    display: "table",
    width: '50%',
    marginHorizontal: "25",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableFirstRow: {
    backgroundColor: 'lightgrey',
    flexDirection: "row",
    justifyContent: 'flex-start'
  },
  summaryTableFirstRow: {
    backgroundColor: 'lightgrey',
    flexDirection: "row",
    justifyContent: 'center',
    textAlign: 'center',
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    paddingVertical: 5
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: 'flex-start'
  },
  tableFirstCol: {
    width: '40%',
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol: {
    width: '15%',
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  summaryTableCol: {
    width: '50%',
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 11,
    padding: 2
  }
})


// Create Document Component
const PDF = ({ jobDetails }) => {
  const hours = 15
  const { first_name, last_name, email, address } = jobDetails.freelancerInfo
  const { name } = jobDetails.jobData.company
  const subTotal = (jobDetails.jobData.pay * hours).toFixed(2)

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.details}>
          <View style={styles.detailscontainerbox}>
            <View style={styles.detailsbox}>
              <Text>{`${first_name} ${last_name}`}</Text>
              {jobDetails.freelancerInfo.business_name && <Text>{jobDetails.freelancerInfo.business_name}</Text>}
              <Text>{address}</Text>
              <Text>{email}</Text>
            </View>
            <Text>Invoice number: </Text>
            <Text>Invoice date: {new Date().toLocaleDateString()} </Text>
          </View>
          <View style={styles.detailscontainerbox}>
            <View style={styles.detailsbox}>
              <Text>{name}</Text>
              <Text>Address</Text>
              <Text>Email</Text>
            </View>
            <Text>Due date: {new Date().toLocaleDateString() + 10}</Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableFirstRow}>
            <View style={styles.tableFirstCol}>
              <Text style={styles.tableCell}>Service</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Date supplied</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Rate</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total hours</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Subtotal</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableFirstCol}>
              <Text style={styles.tableCell}>{jobDetails.jobData.name}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{new Date(jobDetails.jobData.completion_date).toLocaleDateString()}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{`£${jobDetails.jobData.pay} per hour`}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{hours}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{`£${subTotal}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.summaryTableContainer}>
          <View style={styles.summaryTable}>
            <View style={styles.summaryTableFirstRow}>
              <Text>Summary</Text>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.summaryTableCol}>
                <Text style={styles.tableCell}>Subtotal</Text>
              </View>
              <View style={styles.summaryTableCol}>
                <Text style={styles.tableCell}>{`£${subTotal}`}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.summaryTableCol}>
                <Text style={styles.tableCell}>VAT (20%)</Text>
              </View>
              <View style={styles.summaryTableCol}>
                <Text style={styles.tableCell}>{`£${parseFloat(subTotal * 0.2).toFixed(2)}`}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.summaryTableCol}>
                <Text style={styles.tableCell}>Total</Text>
              </View>
              <View style={styles.summaryTableCol}>
                <Text style={styles.tableCell}>{`£${(parseFloat(subTotal) + parseFloat(subTotal * 0.2)).toFixed(2)}`}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default PDF