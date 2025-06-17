import {useState} from 'react'

const Carousel = ({data}) => {
    const [current_i, set_current_i] = useState(0);

    const prev = () => {
        set_current_i(current_i === 0 ? data.length - 1 : current_i - 1);
    }

    const next = () => {
        set_current_i(current_i === data.length - 1 ? 0 : current_i + 1);
    }

  return (
    <div className="flex py-10 mx-auto" key={data}>
      {/* <div className="h-full" style={{backgroundImage: `url(${data[current_i].img_url})`}}>

      </div> */}
      <img src={data[current_i].img_url} className="object-contain" />
      {/* RightArrow */}
      {/* LeftArrow */}
    </div>
  )
}

export default Carousel
