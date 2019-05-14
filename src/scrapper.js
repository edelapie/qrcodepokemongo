import axios from 'axios';
import React from 'react';
import cheerio from 'cheerio';
import QRCode from 'qrcode.react';
import { Card , CardText } from 'reactstrap';



export default class Scrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: []
     };
}

 Cart(props) {
    return(
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm center-block">
                <Card>
                    <div className={'center mt-0'}>
                        <QRCode value={props.code}/>
                    </div>
                    <CardText>{props.code}</CardText>
                </Card>
            </div>
        </div>
    );
}

listFriendCode() {
    const resAxios = axios.get('https://www.maison-gourmande.com/codes-amis-pokemon-go.html');
    return(
        resAxios.then(res => {
        const resultList = [];
        const cheerioload = cheerio.load(res.data);

        cheerioload('.two, .one').each(function (i, elem) {
            resultList[i] = cheerioload(elem).text().replace(/\s/g, '');
        });
        const uniqueQrcode = Array.from(new Set(resultList));
        return uniqueQrcode;
    }));
}
componentWillMount() {
  const promise = new Promise(resolve => {
          resolve(this.listFriendCode());

  });
  promise.then(result => {
      this.setState({ name: result });
  }, function(error) {
      this.setState({ name: error });
  });
}

render() {

  const listItems = this.state.name.map(number =>
      <this.Cart key={number.toString()} code={number} />
  );
  return (
   
      <div className="container">
          <div className="album py-5 bg-light">
          <h2>Liste codes Amis Pokemon GO</h2>
              <div className="container mt-0">
                  <div className="row text-center img-responsive center-block ">
                      {listItems}
                  </div>
              </div>
          </div>
      </div>
    
  );
}
}
