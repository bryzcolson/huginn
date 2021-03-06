import React from 'react';
import styled from 'styled-components';
import {
  IoMdArrowBack,
  IoMdArrowForward,
  IoMdRefresh
} from 'react-icons/io';
import Button from './Button';
import {Horizontal} from './Layout';

export default function Toolbar(props: {
  addr: string,
  setAddr(addr: string): void,
  onNavigate(url: string, modifyHistory: boolean): void,
  canBack: boolean,
  onBack(): void,
  canNext: boolean,
  onNext(): void,
  canRefresh: boolean,
  onRefresh(): void
}) {
  let addr = props.addr;
  let setAddr = props.setAddr;
  const $addr = React.useRef<HTMLInputElement>(null);

  const changeAddr = React.useCallback((e: React.ChangeEvent) => {
    setAddr((e.target as HTMLInputElement).value);
  }, [setAddr]);

  const submitAddr = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const url = (e.target as HTMLInputElement).value.trim();
      if (!url) return;
      $addr.current?.blur();
      props.onNavigate(url, true);
    }
    else if (e.key === 'Escape') {
      setAddr(addr);
      $addr.current?.blur();
    }
  }, [addr]);

  return (
    <Container>
      <ToolbarButton title="back" disabled={!props.canBack} onClick={props.onBack}>
        <IoMdArrowBack size={22}/>
      </ToolbarButton>
      <ToolbarButton title="next" disabled={!props.canNext} onClick={props.onNext}>
        <IoMdArrowForward size={22}/>
      </ToolbarButton>
      <ToolbarButton title="refresh" disabled={!props.canRefresh} onClick={props.onRefresh}>
        <IoMdRefresh size={22}/>
      </ToolbarButton>
      <AddressField
        ref={$addr}
        value={addr}
        placeholder="Enter Odin URL"
        onChange={changeAddr}
        onKeyDown={submitAddr}
      />
    </Container>
  )
}

const Container = styled(Horizontal)`
  z-index: 10;
  height: 38px;
  padding: 4px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
`;

const ToolbarButton = styled(Button)`
  align-self: center;
  height: 30px;
`;

const AddressField = styled.input`
  flex: 1;
  font-size: inherit;
  padding: 1px 12px 3px;
  border: none;
  border-radius: 5px;
  background: transparent;
  -webkit-app-region: no-drag;
  &:hover, &:focus {
    background: #EAF1F6;
  }
`;
