import React from "react"
import { Dimmer, Loader } from "semantic-ui-react"

interface ILoadingComponentProps {
  inverted?: boolean
  content?: string
}

const LoadingComponent = ({ inverted = true, content = "Loading ..." }: ILoadingComponentProps) => {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  )
}

export default LoadingComponent
