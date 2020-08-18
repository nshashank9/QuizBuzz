import React,{Component} from 'react'; 
import questions from '../questions'
import isEmpty from '../isEmpty'
import classNames from 'classnames';
class Play extends Component{
    
    constructor (props){
        super(props);
        this.state = {
            questions,
            curr: {},
            next :{},
            prev:{},
            ans : "",
            numques: 0,
            numans : 0,
            correct:0,
            prevOff: true,
            nextOff: false,
            curridx : 0,
            wrong:0,
            score:0,
            hints: 5,
            fifty:2,
            usedfifty: false,
            time:{}
        }
        this.interval = null;
    };

    componentDidMount(){
        this.displayques(this.state.questions,this.state.prev,this.state.curr,this.state.next)
        this.timer();
    }
    displayques = (questions=this.state.questions,prev,curr,next) =>{
            let {curridx} = this.state;
            if(!isEmpty(this.state.questions)){
                curr = questions[curridx];
                next = questions[curridx+1];
                prev = questions[curridx-1];
                const ans = curr.ans;
                this.setState({
                    curr,next,prev,ans
                },()=>{
                    this.retainSelectors();
                    this.offbtn();
                })
            }
     }
     
    select = (e) =>{ 
        console.log(this.state)
            if(e.target.innerHTML===this.state.curr.answer){
                this.right();
            }
            else {
                this.wrong();
            }
    }
    right = () =>{
        alert("Correct!");
        this.setState(pre=>({
                score: pre.score + 1,
                curridx: pre.curridx + 1,
                numans: pre.numans +1,
                correct: pre.correct + 1
        }),()=>{
            if(this.state.next === undefined){
                this.exit();
            }else{
                this.displayques(this.state.questions,this.state.prev,this.state.curr,this.state.next)

            }
        })
    }
    wrong = () =>{
        alert("Wrong!");
        this.setState(pre=>({
                wrong: pre.wrong + 1,
                curridx: pre.curridx + 1,
                numans: pre.numans +1
        }),()=>{
            if(this.state.next === undefined){
                this.exit();
            }else{
                this.displayques(this.state.questions,this.state.prev,this.state.curr,this.state.next)

            }
        })
    }
    offbtn = () =>{
        if(this.state.prev===undefined || this.state.curr===0){
            this.setState({
                prevOff: true
            });
        }else{
            this.setState({
                prevOff: false
            });
        }
        if(this.state.next===undefined || this.state.curr + 1===this.state.numques){
            this.setState({
                nextOff: true
            });
        }else{
            this.setState({
                nextOff: false
            });
        }
    }
    timer=()=>{
        const initime = Date.now() + 180000;
        this.interval = setInterval(()=>{
            const now = new Date();
            const remaining = initime - now;
            const min = Math.floor((remaining % (1000*60*60))/(1000*60));
            const sec = Math.floor((remaining % (1000*60))/(1000));

            if(remaining<0){
                clearInterval(this.interval);
                this.setState({
                    time:{
                        min : 0,
                        sec : 0
                    }
                },()=>{
                    this.exit();
                })
            } else{
                this.setState({
                    time:{
                        min,
                        sec 
                    }
            });
        }
    },1000)
    }
    clicknext=()=>{
        if(this.state.next!==undefined){
            this.setState(pre=>({
                curridx:pre.curridx+1
            }),()=>{
                this.displayques(this.state.questions,this.state.prev,this.state.curr,this.state.next)
            })
        }
    }

    retainSelectors = () =>{
        const options = Array.from(document.querySelectorAll(".option"));
        options.forEach(item =>{
            item.style.visibility = 'visible';
        })
    }

    fifty=()=>{
        const random = [];
        let count = 0;
        let ansidx;
        if(this.state.fifty>0 && this.state.usedfifty===false){
           const options = document.querySelectorAll(".option")
            options.forEach((option,index)=>{
                if(option.innerHTML === this.state.ans){
                    ansidx = index;
                }
            })
            do{
                const rno = Math.round(Math.random()*3);
                if(rno !==ansidx){
                    if(random.length<2 &&  !random.includes(rno) && !random.includes(ansidx)){
                        random.push(rno);
                        count++;
                    }else{
                        while(true){
                            const nrno = Math.round(Math.random()*3);
                            if(!random.includes(nrno) && !random.includes(ansidx)){
                                random.push(nrno);
                                count++;
                                break;
                            }
                        }
                    }
                }
            }while(count<2)
            options.forEach((option,idx)=>{
                if(random.includes(idx)){
                    option.style.visibility = 'hidden'
                }
            })
            this.setState(pre=>({
                fifty: pre.fifty - 1,
                usedfifty: true
            }))
        }
    }
    clickprev=()=>{
        if(this.state.prev!==undefined){
            this.setState(pre=>({
                curridx:pre.curridx-1
            }),()=>{
                this.displayques(this.state.questions,this.state.prev,this.state.curr,this.state.next)
            })
        }
    }
    clickquit=()=>{
        if(window.confirm("Quitting?")){
            this.props.history.push("/")
        }
    }
    exit=()=>{
        alert('end game');
        const { state } = this
        const stats = {
            correct: state.correct,
            numques: state.numques,
            numans: state.numans, 
            wrong:state.wrong,
            score: state.score,
            fifty:2 - state.fifty
        }
        
        setTimeout(()=>{
            this.props.history.push("/");
            console.log(stats);
        },1000)
    }
    btnclk=(e)=>{
        switch(e.target.id){
            case 'nextbtn': 
                this.clicknext();
                break;
             case 'prevbtn' : 
                this.clickprev();
                break;
             case 'exitbtn' :
                 this.clickquit();
                 break;
            // default : 
        }
    }
    render(){ 
        const {curr,curridx,fifty,hints,numques,time} = this.state;
        return(<>
                  <div className="question">
                      <div className="qno">
                          <p>
                              <span onClick={this.fifty}>Option Slash</span> 
                          </p>
                      </div>
                      <div>
                          <p>
                            <span>{this.state.curridx+1} of {this.state.questions.length}</span> 
                          </p>
                          <p>
                              <span>time remaining</span> {time.min} : {time.sec}
                          </p>
                      </div>
                <h5>{this.state.curr.question}</h5>
                        <div className="option-blk">
                            <p onClick={this.select} className="option">{this.state.curr.optionA}</p>
                            <p onClick={this.select} className="option">{this.state.curr.optionB}</p>
                        </div>
                        <div className="option-blk">
                            <p onClick={this.select} className="option">{this.state.curr.optionC}</p>
                            <p onClick={this.select} className="option">{this.state.curr.optionD}</p>
                        </div>
                        <div className="btn-blk">
                                <button id="prevbtn" className={classNames('',{'disable':this.state.prevOff})} onClick={this.btnclk}>Last</button>
                                <button id="nextbtn" className={classNames('',{'disable':this.state.nextOff})} onClick={this.btnclk}>Next</button>
                                <button id="exitbtn" onClick={this.btnclk}>Exit</button>
                        </div>      
                  </div>
            </>
        );
    }
}

export default Play;