import paper from '../../../assets/paper.png'


export function Home() {
  return (
    <div className="flex px-10 pt-10 gap-20">

      <div className="flex flex-col gap-8 items-center w-[20rem] h-[25rem] rounded-xl font-bold bg-primary-darkGray">
        <h1 className="text-2xl">Performance em Metas</h1>
        <strong className="text-red-500 text-4xl">0.0%</strong>
        <div className="bg-primary-yellowNeon h-1 w-full"></div>
        <section className="flex gap-4 p-5">
          <div className="flex items-center justify-center rounded-3xl bg-white w-32 h-32">
            <h1>FEEDBACKS</h1>
          </div>
          <div className="flex items-center justify-center rounded-3xl bg-white w-32 h-32">
            <h1>METAS</h1>
          </div>
        </section>
      </div>

      <div className="flex flex-col w-[60rem] gap-5">
        <div className="bg-primary-darkGray p-2 rounded-full">
          <h1 className="bg-white w-fit py-2 px-10 rounded-full">TIMELINE</h1>
        </div>

        <div  className="flex items-center justify-center bg-primary-darkGray rounded-3xl">
          <img src={paper} alt="" />
        </div>
      </div>
    </div>
  )
}
