import {Customer} from '@c2b/muven-core'
import {CustomerDto, OrderCompleteDto} from '@c2b/__SDK-NAME__'
import { BaseAdapter } from '@c2b/agent-commons';

export class CustomerAdapter extends BaseAdapter<CustomerDto, Customer> {
    async convertToMuven(dto: CustomerDto): Promise<Customer> {
        const entity = new Customer();

        // ???

        return entity;
    }

    async convertFromOrder(dto: OrderCompleteDto, idChannel:number):Promise<Customer> {
        let customerEntity = new Customer();

        // ???
        
        return customerEntity;
    }
}
