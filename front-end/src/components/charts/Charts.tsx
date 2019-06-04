import * as React from 'react';
import styled from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface ChartsProps {}

interface ChartsState {
  data: [];
  happyAverage: number;
  okayAverage: number;
}

const ChartsContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
    padding: 0 10%;
  }
`;
const TableChart = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  overflow-y: scroll;
`;

const Flex1 = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;

  &:first-child {
    margin-right: 100px;
  }
`;

const MoodChart = styled.div`
  position: relative;
  padding-left: 50px;
  border-left: solid 5px #444444;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: row;

  &:before {
    content: '100%';
    position: absolute;
    top: 0;
    left: 0;
    color: gray;
  }
  &:after {
    content: '0%';
    position: absolute;
    bottom: 0;
    left: 0;
    color: gray;
  }
`;

const Okay = styled.div`
  flex: 1;
  width: 100%;
  height: 0;
  background-color: tomato;
`;

const Happy = styled.div`
  flex: 1;
  width: 100%;
  height: 0;
  background-color: #54c6c1;
`;

const ChartDescription = styled.div`
  margin: 1em auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
`;
const LabelHappy = styled.div`
  color: white !important;
  padding: 1em;
  color: red;
  width: 100%;
  height: 100%;
  background: #54c6c1;
`;
const LabelOkay = styled.div`
  color: white !important;
  padding: 1em;
  color: red;
  width: 100%;
  height: 100%;
  background: tomato;
`;

const Table = styled.ul`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  list-style: none;
`;

const ListItem = styled.li`
  box-sizing: border-box;
  padding: 0.1em 0;
  background: rgba(0, 0, 0, 0.05);
  display: block;
  &:first-child {
    border-bottom: solid 3px gray;
    background: rgba(0, 0, 0, 0.2);
    padding: 0.5em 0;
  }
`;
const Th = styled.div`
  width: 50%;
  height: 100%;
  display: inline-block;
  margin-bottom: 0.2rem;
  text-align: center;
`;

interface ObjectPersonForTableChart {
  timestamp: string;
  mood: string;
}

class Charts extends React.Component<ChartsProps, ChartsState> {
  public constructor(props: ChartsProps) {
    super(props);
    this.state = {
      data: [],
      happyAverage: 0,
      okayAverage: 0
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8000/careRecipients/mood')
      .then(response => response.json())
      .then(_data => {
        let happyAverage;
        let okayAverage;
        let data;
        if (_data) {
          data = _data.map(
            (_careRecipient: {}): {} => {
              // @ts-ignore
              const payload = JSON.parse(_careRecipient.payload);
              const timestamp = payload.timestamp;
              const mood = payload.mood;
              return {
                timestamp,
                mood
              };
            }
          );

          happyAverage =
            (_data.filter(
              (_careRecipient: {}): boolean => {
                // @ts-ignore
                const payload = JSON.parse(_careRecipient.payload);
                const isHappy: boolean = payload.mood === 'happy';
                return isHappy;
              }
            ).length *
              100) /
            _data.length;
          okayAverage =
            (_data.filter(
              (_careRecipient: {}): boolean => {
                // @ts-ignore
                const payload = JSON.parse(_careRecipient.payload);
                const isOkay: boolean = payload.mood === 'okay';
                return isOkay;
              }
            ).length *
              100) /
            _data.length;
          this.setState({
            okayAverage,
            happyAverage,
            data
          });
        }
      });
  }

  public render() {
    return (
      <>
        <ChartsContainer>
          <Flex1>
            <TableChart>
              <Table>
                <ListItem>
                  <Th>TimeStamp</Th>
                  <Th>Mood</Th>
                </ListItem>
                {this.state.data.length > 0 &&
                  this.state.data.map(
                    (_person: ObjectPersonForTableChart, index: number) => {
                      return (
                        <ListItem key={_person.timestamp}>
                          <Th>{_person.timestamp}</Th>
                          <Th>{_person.mood}</Th>
                        </ListItem>
                      );
                    }
                  )}
              </Table>
            </TableChart>
          </Flex1>
          <Flex1>
            <MoodChart>
              <Happy style={{ height: `${this.state.happyAverage}%` }} />
              <Okay style={{ height: `${this.state.okayAverage}%` }} />
            </MoodChart>
            <ChartDescription>
              <LabelHappy>
                Happy: {Math.round(this.state.happyAverage)}%
              </LabelHappy>
              <LabelOkay>Okay: {Math.round(this.state.okayAverage)}%</LabelOkay>
            </ChartDescription>
          </Flex1>
        </ChartsContainer>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Charts);
