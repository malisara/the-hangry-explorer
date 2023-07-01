type Props = {
  title: string
}

function Title({ title }: Props): JSX.Element {
  return (
    <div
      className={`flex justify-center text-3xl mt-24 lg:mt-36 mb-8 lg:mb-10`}
    >
      {title}
    </div>
  )
}

export default Title
