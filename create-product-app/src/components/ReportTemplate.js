import React from 'react';

import {useIntl} from 'react-intl';

function ReportTemplate(props) {

    const intl = useIntl();
   
    const {trafficTicketList} = props.store;
   
    const styles = {
        page: {
            marginLeft: '1rem',
            marginRight: '1rem',
            'page-break-after': 'always',
            textAlign: 'center'
        },

        columnLayout: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '400px'
        },

        column: {
            display: 'flex',
            flexDirection: 'column',
            width: '200px'
        },

        spacer2: {
            height: '2rem',
        },

        fullWidth: {
            width: '100%',
        },

        marginb0: {
            marginBottom: 0,
            width: '200px',
            fontSize: '12px',
            textAlign: 'left'
        },

        introText: {
            width: '400px'
        }

    };

return (
    <div style={styles.page}>
        <div style={styles.page}>
            <h2 style={styles.introText}>
                Traffic Ticket Receipt
            </h2>
        </div>
        <div style={styles.page}>
            <div>
                <h3 style={styles.introText}>
                    This is the confirmation of payment with the following data:
                </h3>
            </div>

            <div style={styles.columnLayout}>
                <div style={styles.column}>
                    <h5 style={styles.marginb0}>Field</h5>
                </div>

                <div style={styles.column}>
                    <h4 style={styles.marginb0}>Value</h4>
                </div>
            </div>
            <div style={styles.columnLayout}>
                <div style={styles.column}>
                    <p style={styles.marginb0}>
                        Amount
                    </p>
                </div>

                <div style={styles.column}>             
                    <p style={styles.marginb0}>
                        {props.store.amount}
                    </p>
                </div>
            </div>

            {Object.entries(trafficTicketList).map(([key, obj], index) => { return (
                <>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                            {intl.formatMessage({id: 'id'})}
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                            {obj.id}
                        </p>
                    </div>
                </div>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                            {intl.formatMessage({id: 'car-registration-number'})}
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                            {obj.carRegistrationNumber}
                        </p>
                    </div>
                </div>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                            {intl.formatMessage({id: 'date-created'})}
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                            {obj.dateCreated}
                        </p>
                    </div>
                </div>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                            {intl.formatMessage({id: 'reason-for-traffic-violation'})}
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                            {obj.reasonForTrafficViolation}
                        </p>
                    </div>
                </div>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                            {intl.formatMessage({id: 'amount'})}
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                            {obj.amount}
                        </p>
                    </div>
                </div>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                            {intl.formatMessage({id: 'discount-for-prepayment'})}
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                            {obj.discountForPrepayment}
                        </p>
                    </div>
                </div>
                <div style={styles.columnLayout}>
                    <div style={styles.column}>
                        <p style={styles.marginb0}>
                            {intl.formatMessage({id: 'traffic-violation-address'})}
                        </p>
                    </div>

                    <div style={styles.column}>             
                        <p style={styles.marginb0}>
                            {obj.trafficViolationAddress}
                        </p>
                    </div>
                </div>
                </>
                
            )})}
        </div>
    </div>
 );
}
export default ReportTemplate;