import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import credit_card from './assets/credit_card.png';
import PlaidLinkButton from 'react-plaid-link-button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import PieChart from 'highcharts-react-official';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      accounts: [],
      chartData: [],
      public_token: '',
      access_token:'' // Normally this should be stored on the server. For the scope of this Frontend Test, it's store on the client side
    }
  }

  handleOnSuccess = (token, metadata) => {
  this.setState({data: metadata, public_token:token}, this.getAccessToken)
};

getAccessToken = () => {
  axios.post('http://localhost:8000/get_access_token',{
    public_token: this.state.public_token
  }).then(res => {
    this.setState({access_token:res.data.access_token}, this.getBalances)
  })
}

getBalances = () => {
  axios.get('http://localhost:8000/balance',{
      access_token: this.state.access_token
    }).then(res => {
    console.log(res.access_token)
    this.setState({accounts: res}, this.createBalances)
  }).catch(err => {
    console.log(err)  // Handle error in the API call
  })
}

createBalances = () => {
  let arrTemp = []
  this.state.accounts.data.balance.accounts.map(b => {
    let name = b.name
    let y = b.balances.current
    arrTemp.push({name,y})
  })
  this.setState({chartData:arrTemp})
}

render() {
  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Portfolio Breakdown'
    },
    tooltip: {
      pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
      }
    },
    series: [
      {
        name: 'Accounts',
        data: this.state.chartData
      }
    ]
  };
  const { classes } = this.props;
  return (
    <div className='App'>
      <h4 className='text-center'>
        <b>Welcome to AgentRisk</b>
      </h4>
      {this.state.data.length <= 0 ?  // If no data exists, render the homepage so the user can start the process
      <div className='App-header'>
        <img
                src={credit_card}
                style={{ width: '350px' }}
                className='responsive-img credit-card'
                alt='Undraw'
              />
      <h4 className='flow-text'>
        <b>Link</b> your bank account by clicking below to get started with your personal finance app{' '}
      </h4>
      <PlaidLinkButton
      buttonProps={{ className: 'main-btn' }}
      plaidLinkProps={{
        clientName: 'AgentRisk',
        key: 'de7c25f6fd11530416184e89a06288',
        env: 'sandbox',
        product: ['auth'],
        webhook: 'https://my-backend-webhook',
        onSuccess: this.handleOnSuccess,
      }}
      children= 'Link Account'
    >
    </PlaidLinkButton>
      </div>
        :     // If data exists, render the dashboard 
          <div style={{marginTop:10}}>
            <div className='subheading'>
              <div>
                <p className='linked-accounts'><b>Linked Accounts: </b>
                {this.state.data.institution.name}</p>
              </div>
            <div>
              <PlaidLinkButton
              buttonProps={{ className: 'main-btn main-btn-long' }}
              plaidLinkProps={{
                clientName: 'AgentRisk',
                key: 'de7c25f6fd11530416184e89a06288',
                env: 'sandbox',
                product: ['auth'],
                webhook: 'https://my-backend-webhook',
                onSuccess: this.handleOnSuccess,
              }}
              children= 'Link Another Account'
            >
            </PlaidLinkButton>
            </div>
          </div>
      <div className='main-table'>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align='right'>type</TableCell>
                <TableCell align='right'>subtype</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.accounts.map(a => (
                <TableRow key={a.name}>
                  <TableCell component='th'>
                    {a.name}
                  </TableCell>
                  <TableCell align='right'>{a.type}</TableCell>
                  <TableCell align='right'>{a.subtype}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <div className='chart'>
        <PieChart highcharts={Highcharts} options={options} />
        </div>
      </div>
    </div>}
  </div>);
}}

export default withStyles(styles)(App);
