say -v Moira Testing & cd $homeVar && docker exec nodejs /bin/sh -c "npm run test-api 2>tmperrortest.log;exit";check=$(cat $homeVar/build/nodejs/app/tmperrortest.log | grep ERR! | wc -l);if [ $check -eq 0  ]; then say -v Moira Testing complete; else say -v Moira Testing failed; fi  & ps aux |     grep say; cat $homeVar/build/nodejs/app/tmperrortest.log && rm $homeVar/build/nodejs/app/tmperrortest.log
