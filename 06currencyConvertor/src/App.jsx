import { useState } from 'react'
import {InputBox} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {
  const [amount,setAmount] = useState("")
  const [from,setFrom] = useState("usd")
  const [to,setTo] = useState("inr")
  const [convertedAmount,setConvertedAmount] = useState(0)
  
  const fromCurrencyInfo = useCurrencyInfo(from)
  const options=Object.keys(fromCurrencyInfo)
  const swap=()=>{
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  const convert = () => {
    if (!fromCurrencyInfo[to]) return;

    setConvertedAmount(
        parseFloat(amount || 0) * fromCurrencyInfo[to]
    )
}

  return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://imgs.search.brave.com/U-cPQyGj67Q9tONyu5ZKrQoKhEAIdKy-Ag2IA7ULuSg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjEx/MTE2NTY4MC9waG90/by9ldXJvLXBhcGVy/LW1vbmV5LmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1HZmZI/TkpQNi1aVXEtX0lt/RkIyNjRqcHFYZUFO/V3QtY05MWC1hdzRm/VFY4PQ')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert()
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                                
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default App
