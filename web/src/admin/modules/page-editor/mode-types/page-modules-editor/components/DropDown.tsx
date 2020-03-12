import React, {useState} from 'react';
import {Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';

type DropdownItemDescription = {
    DropdownItemRenderer: React.FC<{ item?: any }>,
    item?: any
}

type DropdownProps = {
    DropdownHeaderRenderer: React.FC,
    dropdownItems: Array<DropdownItemDescription>
}

export default ({DropdownHeaderRenderer, dropdownItems}: DropdownProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="left">
            <DropdownToggle>
                <DropdownHeaderRenderer/>
            </DropdownToggle>
            <DropdownMenu>
                {dropdownItems.map(({DropdownItemRenderer, item}) => {
                    return <DropdownItemRenderer item={item}/>
                })}
            </DropdownMenu>
        </Dropdown>
    );
}
