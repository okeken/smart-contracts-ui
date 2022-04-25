import {
  DomainCreated,
 // Transfer
 okeDomains as TokenContract
} from "../generated/okeDomains/okeDomains"
import { Domain, User } from "../generated/schema"


export function handleDomainCreated(event: DomainCreated): void {
  let domain = Domain.load(event.params._tokenId.toString())
  let tokenContract = TokenContract.bind(event.address);
 if (!domain) {
   domain = new Domain(event.params._tokenId.toString())
   domain.finalTokenUri=`${tokenContract.svgPartOne()}${event.params._domain}.${tokenContract.tld()}${tokenContract.svgPartTwo()}`
  domain.name = `${event.params._domain}.${tokenContract.tld()}`
  domain.initMint=event.params._amt
  domain.tokenID = event.params._tokenId
  domain.owner = event.transaction.from.toHex()
  domain.save()
  }
  
  let user = User.load(event.transaction.from.toHex());
  if (!user) {
   user = new User(event.transaction.from.toHex());
   user.save();
  }
}
